-- Paste this code into a script in "ServerScriptService"
local MS = game:GetService("MessagingService")
local HS = game:GetService("HttpService")

MS:SubscribeAsync("KickSignal", function(content)
	local contentDecode = HS:JSONDecode(content.Data)

	local userId = contentDecode.UserID
	local reason = contentDecode.Reason
	local author = contentDecode.Author

	for i,v in pairs(game:GetService("Players"):GetPlayers()) do
		if v.UserId == userId then
			v:Kick("You have been kicked by: ".. author .." from this experience. Reason: "..reason)
		end
	end
end)

MS:SubscribeAsync("MessageSignal", function(content)
	local contentDecode = HS:JSONDecode(content.Data)

	local message = contentDecode.Message
	local author = contentDecode.Author

	print(reason, author)
end)