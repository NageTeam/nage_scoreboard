NAGE = exports['nage']:getSharedCode()

RegisterServerEvent("nage:scoreboard:getPlayers")
AddEventHandler("nage:scoreboard:getPlayers", function(myId)
    local nPlayer = NAGE.PlayerID(source)
    local players = {}

    for _, id in ipairs(GetPlayers()) do
        local ping = GetPlayerPing(id)
        local name = GetPlayerName(id)
        table.insert(players, {
            id = tonumber(id),
            name = name,
            ping = ping
        })
    end

    TriggerClientEvent("nage:scoreboard:sendPlayers", nPlayer, players, myId)
end)
