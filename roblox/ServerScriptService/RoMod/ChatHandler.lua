local MS = game:GetService("MessagingService")
local HS = game:GetService("HttpService")
local RS = game:GetService("ReplicatedStorage")
local PS = game:GetService("Players")

--// Initialize remote event
local ChatHandlerRemote = RS:FindFirstChild("ChatHandlerRemote") or Instance.new("RemoteEvent");
ChatHandlerRemote.Name = "ChatHandlerRemote"
ChatHandlerRemote.Parent = RS


MS:SubscribeAsync("MessageSignal", function(content)
	local contentDecode = HS:JSONDecode(content.Data)

	local message = contentDecode.Message
	local author = contentDecode.Author
	local userId = contentDecode.UserId
	
	if userId then
		local player = PS:GetPlayerByUserId(userId)
		if PS:GetPlayerByUserId(userId) then
			ChatHandlerRemote:FireClient(player, {author, message})
		else
			warn("Player not in server")
		end
	else
		ChatHandlerRemote:FireAllClients({author, message})
	end
end)

PS.PlayerAdded:Connect(function(player)
	player.Chatted:Connect(function(msg) 
		local messageData = {
			sender = player,
			message = msg,
		}
		local encoded = HS:JSONEncode(messageData)
		--send to discord bot!
	end)
end)
