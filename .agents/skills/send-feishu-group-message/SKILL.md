---
name: send-feishu-group-message
description: Send messages from the TuLing project to Feishu group chats through the local lark-cli and the feishu-tuling bot profile. Use when the user asks to notify, post, announce, test, or send content to a Feishu group, especially the CAIO group.
---

# Send Feishu Group Messages

Use the local `lark-cli` with profile `feishu-tuling` and bot identity. Never store or print app secrets, access tokens, or refresh tokens.

## Known destination

- Group name: `CAIO`
- Chat ID: `oc_ea6fc3ef0b02647c8bcc9bc55d548643`
- Expected description: `公司项目信息，企业生态，Agent 群组`
- Sender: the `杨正武的飞书 CLI` application bot

Treat the chat ID as environment-specific. If a command reports that it is invalid, search by group name again instead of guessing a replacement.

## Connection

Run commands from `/Users/ryan/mycode/TuLing`. Explicitly set the profile because non-interactive shells may not load `~/.zshrc`.

The terminal must use the local macOS proxy for Feishu connectivity:

```bash
HTTPS_PROXY=http://127.0.0.1:7890 \
HTTP_PROXY=http://127.0.0.1:7890 \
NO_PROXY=127.0.0.1,localhost \
lark-cli --profile feishu-tuling whoami
```

Expect `brand: feishu`, `profile: feishu-tuling`, and `identity: bot` when `--as bot` is used.

## Workflow

1. Require explicit user intent to send a message. Drafting or reviewing text does not authorize sending.
2. Determine the destination. Use the known CAIO chat ID only when the user names CAIO or the conversation unambiguously establishes it.
3. For another group, search before sending:

```bash
HTTPS_PROXY=http://127.0.0.1:7890 HTTP_PROXY=http://127.0.0.1:7890 \
NO_PROXY=127.0.0.1,localhost \
lark-cli --profile feishu-tuling im +chat-search --as bot --query '<group name>' --format json
```

4. If search returns zero or multiple plausible groups, stop and ask the user to identify the destination. Do not choose by guesswork.
5. Send plain text with:

```bash
HTTPS_PROXY=http://127.0.0.1:7890 HTTP_PROXY=http://127.0.0.1:7890 \
NO_PROXY=127.0.0.1,localhost \
lark-cli --profile feishu-tuling im +messages-send \
  --as bot \
  --chat-id '<oc_xxx>' \
  --text '<message>' \
  --format json
```

Pass the message as one argument. Do not construct a shell command by concatenating untrusted message text.

6. Report success only when the response contains `"ok": true`; include the group name and returned `message_id`. On failure, report the error and do not silently retry a write.

## Identity limitation

Default to `--as bot`. The current user authorization does not include `im:message.send_as_user`, so do not claim that a message will appear as the human user. User-identity sending requires that permission to be approved and a fresh OAuth grant.
