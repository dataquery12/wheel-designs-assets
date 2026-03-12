# Session: 2026-03-06 11:01:22 UTC

- **Session Key**: agent:main:telegram:direct:7905688092
- **Session ID**: ad77ff53-aca7-447b-9606-23cc77cdd7c4
- **Source**: telegram

## Conversation Summary

assistant: ✅ New session started · model: volcengine/ark-code-latest
user: A new session was started via /new or /reset. Execute your Session Startup sequence now - read the required files before responding to the user. Then greet the user in your configured persona, if one is provided. Be yourself - use your defined voice, mannerisms, and mood. Keep it to 1-3 sentences and ask what they want to do. If the runtime model differs from default_model in the system prompt, mention the default model. Do not mention internal steps, files, tools, or reasoning.
assistant: Hey Noah! 👋 Pickto 来啦～今天想做什么？
user: Conversation info (untrusted metadata):
```json
{
  "message_id": "2133",
  "sender_id": "7905688092",
  "sender": "Noah",
  "timestamp": "Fri 2026-03-06 16:53 GMT+8"
}
```

Sender (untrusted metadata):
```json
{
  "label": "Noah (7905688092)",
  "id": "7905688092",
  "name": "Noah",
  "username": "jk333x123"
}
```

你知道openclaw怎么增加模型吗？
我希望增加本地的ollama模型用来支持切换；
ollama的服务端口：http://192.168.50.1:11434
assistant: 我来帮你配置 OpenClaw 使用你的本地 Ollama 服务。
assistant: 你的 Ollama 已经配置好了！可以看到配置里已经有了 `ollama` provider，地址是 `http://192.168.50.1:11434`，并且有一个 `qwen3.5:9b` 模型。

不过有个问题：配置里的 `api` 设置成了 `"openai-completions"`，对于远程 Ollama 服务器，建议改成 `"ollama"` 以确保工具调用功能正常。

让我帮你更新配置：
assistant: 好了！我已经更新了配置，主要改动是把 `api` 从 `"openai-completions"` 改成了 `"ollama"`。这样可以确保工具调用功能在远程 Ollama 服务器上也能正常工作。

现在你可以这样使用 Ollama 模型：

- **作为默认模型**：修改 `agents.defaults.model.primary` 为 `"ollama/qwen3.5:9b"`
- **动态切换**：在对话中使用 `/model ollama/qwen3.5:9b` 临时切换模型
- **创建别名**：在 `agents.defaults.models` 中添加 `"ollama/qwen3.5:9b": { "alias": "qwen" }`

如果需要添加更多 Ollama 模型，直接在 Ollama 服务器上拉取即可，OpenClaw 会自动发现工具支持的模型。

你想现在切换到 Ollama 模型试试吗？
