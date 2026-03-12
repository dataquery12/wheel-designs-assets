# Seedream - AI 视频自动生成系统

一个基于 AI 的自动化视频生成系统，可以根据主题自动生成完整的视频内容。

## 功能特性

- **脚本生成**: 基于主题自动生成视频脚本
- **素材生成**: AI 生成图片、搜索视频片段
- **语音合成**: TTS 配音
- **视频合成**: 将素材合成为最终视频
- **配置管理**: 灵活的 API 密钥和参数配置

## 系统架构

```
seedream/
├── config/           # 配置文件
├── core/             # 核心模块
│   ├── script_generator.py    # 脚本生成
│   ├── asset_generator.py     # 素材生成
│   ├── audio_processor.py      # 音频处理
│   └── video_composer.py       # 视频合成
├── utils/            # 工具函数
├── output/           # 输出目录
└── main.py           # 主入口
```

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 配置 API 密钥

复制 `config/config.yaml.example` 为 `config/config.yaml`，并填入你的 API 密钥：

```yaml
openai:
  api_key: "your-openai-api-key"
  
volcengine:
  api_key: "your-volcengine-api-key"
  
# 其他配置...
```

### 3. 运行示例

```bash
python main.py --topic "人工智能的未来" --duration 60
```

## 配置说明

详见 `config/config.yaml.example` 文件。

## 许可证

MIT License
