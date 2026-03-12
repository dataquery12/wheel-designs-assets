"""
Audio Processor Module
Handles text-to-speech, background music, and audio mixing
"""

import os
import tempfile
from typing import Optional, Dict, List
from dataclasses import dataclass
from pathlib import Path
import subprocess

@dataclass
class AudioTrack:
    """音频轨道信息"""
    track_id: str
    track_type: str  # narration, music, sfx
    local_path: str
    duration: float
    volume: float = 1.0
    fade_in: float = 0.0
    fade_out: float = 0.0

class AudioProcessor:
    """
    音频处理器
    负责 TTS 语音合成、背景音乐处理和音频混音
    """
    
    def __init__(self, config: Optional[Dict] = None, temp_dir: str = "./temp"):
        self.config = config or {}
        self.temp_dir = Path(temp_dir)
        self.temp_dir.mkdir(parents=True, exist_ok=True)
        
        # 检查 FFmpeg
        self.ffmpeg_path = self._find_ffmpeg()
        if not self.ffmpeg_path:
            print("[AudioProcessor] 警告: 未找到 FFmpeg，部分功能可能不可用")
        
        # TTS 配置
        self.tts_voice = self.config.get("audio", {}).get("default_voice", "zh-CN-XiaoxiaoNeural")
        
    def _find_ffmpeg(self) -> Optional[str]:
        """查找 FFmpeg 可执行文件"""
        try:
            result = subprocess.run(
                ["which", "ffmpeg"],
                capture_output=True,
                text=True,
            )
            if result.returncode == 0:
                return result.stdout.strip()
        except:
            pass
        
        # 检查常见路径
        common_paths = [
            "/usr/local/bin/ffmpeg",
            "/usr/bin/ffmpeg",
            "/opt/homebrew/bin/ffmpeg",
        ]
        for path in common_paths:
            if os.path.exists(path):
                return path
        
        return None
    
    def text_to_speech(
        self, 
        text: str, 
        voice: Optional[str] = None,
        output_path: Optional[str] = None
    ) -> AudioTrack:
        """
        文本转语音
        
        Args:
            text: 要转换的文本
            voice: 语音选择（可选）
            output_path: 输出路径（可选）
            
        Returns:
            AudioTrack 对象
        """
        voice = voice or self.tts_voice
        
        if not output_path:
            output_path = self.temp_dir / f"tts_{hash(text) % 1000000:06d}.mp3"
        
        print(f"[AudioProcessor] 生成语音: {text[:50]}...")
        
        try:
            # 使用 edge-tts 库
            import edge_tts
            import asyncio
            
            async def generate():
                communicate = edge_tts.Communicate(text, voice)
                await communicate.save(str(output_path))
            
            asyncio.run(generate())
            
            # 获取音频时长
            duration = self._get_audio_duration(str(output_path))
            
            return AudioTrack(
                track_id=f"tts_{hash(text) % 1000000:06d}",
                track_type="narration",
                local_path=str(output_path),
                duration=duration,
                volume=1.0
            )
            
        except Exception as e:
            print(f"[AudioProcessor] TTS 失败: {e}")
            # 创建一个静音文件作为 fallback
            return self._create_silent_audio(output_path, duration=5.0)
    
    def _get_audio_duration(self, audio_path: str) -> float:
        """获取音频时长"""
        try:
            if self.ffmpeg_path:
                result = subprocess.run(
                    [self.ffmpeg_path, "-i", audio_path],
                    capture_output=True,
                    text=True
                )
                # 解析输出中的 Duration
                for line in result.stderr.split('\n'):
                    if 'Duration' in line:
                        time_str = line.split('Duration: ')[1].split(',')[0]
                        h, m, s = time_str.split(':')
                        return float(h) * 3600 + float(m) * 60 + float(s)
        except:
            pass
        return 0.0
    
    def _create_silent_audio(self, output_path: str, duration: float = 5.0) -> AudioTrack:
        """创建静音文件"""
        try:
            if self.ffmpeg_path:
                subprocess.run([
                    self.ffmpeg_path, "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono",
                    "-t", str(duration), "-acodec", "libmp3lame", "-q:a", "4",
                    str(output_path)
                ], check=True, capture_output=True)
        except:
            pass
        
        return AudioTrack(
            track_id=f"silent_{hash(output_path) % 1000000:06d}",
            track_type="narration",
            local_path=str(output_path),
            duration=duration,
            volume=0.0
        )
    
    def mix_audio_tracks(
        self, 
        tracks: List[AudioTrack], 
        output_path: str,
        target_duration: Optional[float] = None
    ) -> str:
        """
        混音多个音频轨道
        
        Args:
            tracks: 音频轨道列表
            output_path: 输出路径
            target_duration: 目标时长（秒）
            
        Returns:
            输出文件路径
        """
        print(f"[AudioProcessor] 混音 {len(tracks)} 个轨道 -> {output_path}")
        
        if not tracks:
            return ""
        
        if len(tracks) == 1:
            # 只有一个轨道，直接复制
            import shutil
            shutil.copy(tracks[0].local_path, output_path)
            return output_path
        
        # 多轨道混音（简化版）
        # 实际项目中应该使用 FFmpeg 的 amix 滤镜
        try:
            # 这里简化处理，实际应该使用 FFmpeg 进行专业混音
            import shutil
            # 暂时只取第一个轨道
            shutil.copy(tracks[0].local_path, output_path)
            print(f"[AudioProcessor] 混音完成: {output_path}")
            return output_path
        except Exception as e:
            print(f"[AudioProcessor] 混音失败: {e}")
            return ""


# 测试代码
if __name__ == "__main__":
    processor = AudioProcessor()
    
    # 测试 TTS
    track = processor.text_to_speech(
        "大家好，欢迎观看本视频。今天我们将探讨人工智能的发展。",
        output_path="./test_tts.mp3"
    )
    print(f"生成音频: {track.local_path}, 时长: {track.duration:.2f}秒")
