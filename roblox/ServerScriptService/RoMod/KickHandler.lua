-- Paste this code into a script in "ServerScriptService"
local MS = game:GetService("MessagingService")
local HS = game:GetService("HttpService")

MS:SubscribeAsync("MessageSignal", function(content)
	local contentDecode = HS:JSONDecode(content.Data)

	local message = contentDecode.Message
	local author = contentDecode.Author

	print(reason, author)
end)