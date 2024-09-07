local RS = game:GetService("ReplicatedStorage")
local TCS = game:GetService("TextChatService")
local ChatHandlerRemote = RS:WaitForChild("ChatHandlerRemote")

local function sendSystemMessage(author, message)
	local r,g,b = (#author * 50) % 256, (#author * 80) % 256, (#author * 120) % 256

	local prefix = "<font color=\"rgb(0, 157, 255)\">[Discord]</font> "
	local name = string.format('<font color="rgb(%d, %d, %d)">%s:</font> ', r, g, b, author)
	
	TCS.TextChannels.RBXGeneral:DisplaySystemMessage(prefix..name..message)
end

ChatHandlerRemote.OnClientEvent:Connect(function(packet)
	sendSystemMessage(table.unpack(packet))
end)

