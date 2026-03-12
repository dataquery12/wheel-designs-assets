"""
Script Generator Module
Generates video scripts based on topics using AI
"""

import os
from typing import Dict, List, Optional
from dataclasses import dataclass
import yaml

@dataclass
class ScriptScene:
    """单个场景/镜头"""
    scene_number: int
    duration: int  # 秒
    visual_description: str
    narration: str
    bgm_suggestion: Optional[str] = None

@dataclass
class VideoScript:
    """完整视频脚本"""
    title: str
    topic: str
    total_duration: int
    target_audience: str
    scenes: List[ScriptScene]
    keywords: List[str]

def load_config(config_path: str = "config/config.yaml") -> Dict:
    """加载配置文件"""
    with open(config_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

class ScriptGenerator:
    """
    视频脚本生成器
    基于主题自动生成完整的视频脚本
    """
    
    def __init__(self, config: Optional[Dict] = None):
        self.config = config or load_config()
        self.openai_api_key = os.getenv("OPENAI_API_KEY") or self.config.get("openai", {}).get("api_key")
        
    def generate_script(
        self, 
        topic: str, 
        duration: int = 60,
        target_audience: str = "general",
        style: str = "educational"
    ) -> VideoScript:
        """
        根据主题生成视频脚本
        
        Args:
            topic: 视频主题
            duration: 目标视频长度（秒）
            target_audience: 目标观众
            style: 视频风格（educational, entertaining, promotional等）
            
        Returns:
            VideoScript 对象包含完整脚本
        """
        
        # 使用模板方式生成脚本（无需实际调用API）
        scenes = self._generate_scenes_template(topic, duration, style)
        
        script = VideoScript(
            title=f"关于{topic}的视频",
            topic=topic,
            total_duration=duration,
            target_audience=target_audience,
            scenes=scenes,
            keywords=self._extract_keywords(topic)
        )
        
        return script
    
    def _generate_scenes_template(self, topic: str, duration: int, style: str) -> List[ScriptScene]:
        """生成场景模板"""
        scenes = []
        
        # 开头场景
        scenes.append(ScriptScene(
            scene_number=1,
            duration=5,
            visual_description=f"引人注目的开场画面，展示{topic}的核心概念",
            narration=f"欢迎来到今天的分享，我们将一起探索{topic}的奥秘。",
            bgm_suggestion="轻快、充满活力的背景音乐"
        ))
        
        # 主体场景（根据时长分配）
        body_duration = duration - 10  # 开头5s + 结尾5s
        num_body_scenes = max(2, body_duration // 15)  # 每个场景约15秒
        
        for i in range(num_body_scenes):
            scene_duration = body_duration // num_body_scenes
            scenes.append(ScriptScene(
                scene_number=i + 2,
                duration=scene_duration,
                visual_description=f"{topic}的第{i+1}个关键点展示，配合动态图表或实例",
                narration=f"让我们深入了解{topic}的第{i+1}个方面...",
                bgm_suggestion="平稳、专业的背景音乐"
            ))
        
        # 结尾场景
        scenes.append(ScriptScene(
            scene_number=len(scenes) + 1,
            duration=5,
            visual_description="总结画面，展示关键要点和联系方式/行动号召",
            narration=f"今天我们学习了{topic}的核心内容，希望对你有所帮助！",
            bgm_suggestion="渐弱的结尾音乐"
        ))
        
        return scenes
    
    def _extract_keywords(self, topic: str) -> List[str]:
        """提取关键词"""
        # 简单的关键词提取
        keywords = [topic]
        keywords.extend(["AI生成", "自动化", "视频制作"])
        return keywords
    
    def export_script(self, script: VideoScript, format: str = "json") -> str:
        """
        导出脚本到不同格式
        
        Args:
            script: VideoScript 对象
            format: 导出格式 (json, txt, markdown)
            
        Returns:
            导出内容的字符串
        """
        if format == "json":
            import json
            from dataclasses import asdict
            return json.dumps(asdict(script), ensure_ascii=False, indent=2)
        
        elif format == "markdown":
            lines = [
                f"# {script.title}",
                f"",
                f"**主题**: {script.topic}",
                f"**目标观众**: {script.target_audience}",
                f"**总时长**: {script.total_duration}秒",
                f"**关键词**: {', '.join(script.keywords)}",
                f"",
                f"## 场景分镜",
                f"",
            ]
            for scene in script.scenes:
                lines.extend([
                    f"### 场景 {scene.scene_number} ({scene.duration}秒)",
                    f"",
                    f"**画面**: {scene.visual_description}",
                    f"",
                    f"**旁白**: {scene.narration}",
                    f"",
                    f"**背景音乐建议**: {scene.bgm_suggestion or '无'}",
                    f"",
                ])
            return "\n".join(lines)
        
        elif format == "txt":
            lines = [
                f"标题: {script.title}",
                f"主题: {script.topic}",
                f"目标观众: {script.target_audience}",
                f"总时长: {script.total_duration}秒",
                f"",
                f"场景分镜:",
                f"",
            ]
            for scene in script.scenes:
                lines.extend([
                    f"场景 {scene.scene_number} - {scene.duration}秒",
                    f"  画面: {scene.visual_description}",
                    f"  旁白: {scene.narration}",
                    f"",
                ])
            return "\n".join(lines)
        
        else:
            raise ValueError(f"不支持的导出格式: {format}")


# 测试代码
if __name__ == "__main__":
    # 创建脚本生成器
    generator = ScriptGenerator()
    
    # 生成脚本
    script = generator.generate_script(
        topic="人工智能的发展",
        duration=60,
        target_audience="科技爱好者",
        style="educational"
    )
    
    # 导出为不同格式
    print("=== Markdown 格式 ===")
    print(generator.export_script(script, "markdown"))
    
    print("\n\n=== JSON 格式 ===")
    print(generator.export_script(script, "json"))
