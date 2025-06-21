local scoreboardVisible = false
local updateThreadRunning = false

RegisterCommand("scoreboard", function()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = "show" })
    TriggerServerEvent("nage:scoreboard:getPlayers", GetPlayerServerId(PlayerId()))
end, false)

RegisterKeyMapping("scoreboard", "Open Scoreboard", "keyboard", "F10")

Citizen.CreateThread(function()
    TriggerEvent('chat:addSuggestion', '/scoreboard', 'Open the server scoreboard')
end)

RegisterNetEvent("nage:scoreboard:sendPlayers")
AddEventHandler("nage:scoreboard:sendPlayers", function(players, myId)
    SendNUIMessage({
        action = "updatePlayers",
        players = players,
        myId = myId
    })
end)

RegisterNUICallback("closeScoreboard", function(_, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({ action = "hide" })
    cb({})
end)

RegisterNUICallback("startUpdatingPlayers", function(_, cb)
    scoreboardVisible = true
    if not updateThreadRunning then
        updateThreadRunning = true
        Citizen.CreateThread(function()
            while scoreboardVisible do
                TriggerServerEvent("nage:scoreboard:getPlayers", GetPlayerServerId(PlayerId()))
                Citizen.Wait(1000)
            end
            updateThreadRunning = false
        end)
    end
    cb({})
end)

RegisterNUICallback("stopUpdatingPlayers", function(_, cb)
    scoreboardVisible = false
    cb({})
end)

