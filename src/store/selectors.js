import { get, groupBy, reject, maxBy, minBy } from 'lodash'
import { createSelector } from 'reselect'

const ADDRESS_0x0 = '0x0000000000000000000000000000000000000000'

// WEB3

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const accountLoaded = state => get(state, 'web3.loaded', false)
export const accountLoadedSelector = createSelector(accountLoaded, l => l)

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

// TOKEN

const tokenLoaded = state => get(state, 'token.loaded', false)
export const tokenLoadedSelector = createSelector(tokenLoaded, tl => tl)

const token = state => get(state, 'token.contract')
export const tokenSelector = createSelector(token, t => t)

const tokenBalanceLoaded = state => get(state, 'token.tokenBalance.loaded', false)
export const tokenBalanceLoadedSelector = createSelector(tokenBalanceLoaded, l => l)

const tokenBalance = state => get(state, 'token.tokenBalance.data', '0')
export const tokenBalanceSelector = createSelector(tokenBalance, tb => tb)

// EXCHANGE

const exchangeLoaded = state => get(state, 'exchange.loaded', false)
export const exchangeLoadedSelector = createSelector(exchangeLoaded, el => el)

const exchange = state => get(state, 'exchange.contract')
export const exchangeSelector = createSelector(exchange, e => e)

export const contractsLoadedSelector = createSelector(
    tokenLoadedSelector,
    exchangeLoadedSelector,
    (tl, el) => (tl && el) 
)

const balancesLoading = state => get(state, 'exchange.balancesLoading', true)
export const balancesLoadingSelector = createSelector(balancesLoading, s => s)

const exchangeTokenBalanceLoaded = state => get(state, 'exchange.exchangeTokenBalance.loaded', false)
export const exchangeTokenBalanceLoadedSelector = createSelector(exchangeTokenBalanceLoaded, l => l)

const exchangeTokenBalance = state => get(state, 'exchange.exchangeTokenBalance.data', '0')
export const exchangeTokenBalanceSelector = createSelector(exchangeTokenBalance, tb => tb)

const allBetsLoaded = state => get(state, 'exchange.allBets.loaded', false)
export const allBetsLoadedSelector = createSelector(allBetsLoaded, l => l)

const allBets = state => get(state, 'exchange.allBets.data', [])
export const allBetsSelector = createSelector(allBets, ab => ab)

const acceptedBetsLoaded = state => get(state, 'exchange.acceptedBets.loaded', false)
export const acceptedBetsLoadedSelector = createSelector(acceptedBetsLoaded, l => l)

const acceptedBets = state => get(state, 'exchange.acceptedBets.data', [])
export const acceptedBetsSelector = createSelector(acceptedBets, ab => ab)

const cancelledBetsLoaded = state => get(state, 'exchange.cancelledBets.loaded', false)
export const cancelledBetsLoadedSelector = createSelector(cancelledBetsLoaded, l => l)

const cancelledBets = state => get(state, 'exchange.cancelledBets.data', [])
export const cancelledBetsSelector = createSelector(cancelledBets, cb => cb)

const closedBetsLoaded = state => get(state, 'exchange.closedBets.loaded', false)
export const closedBetsLoadedSelector = createSelector(closedBetsLoaded, l => l)

const closedBets = state => get(state, 'exchange.closedBets.data', [])
export const closedBetsSelector = createSelector(closedBets, cb => cb)

export const allBetTypesLoadedSelector = createSelector(
    allBetsLoaded,
    acceptedBetsLoaded,
    cancelledBetsLoaded,
    closedBetsLoaded,
    (a, b, c, d) => (a, b, c, d) 
)

const winnerSubmittedLoaded = state => get(state, 'exchange.winnerSubmitted.loaded', false)
export const winnerSubmittedLoadedSelector = createSelector(winnerSubmittedLoaded, l => l)

const winnerSubmitted = state => get(state, 'exchange.winnerSubmitted.data', [])
export const winnerSubmittedSelector = createSelector(winnerSubmitted, cb => cb)

// bets: pending - all

const pendingBets = state => {
    const all = allBets(state)
    const accepted = acceptedBets(state)
    const cancelled = cancelledBets(state)
    const closed = closedBets(state)

    const pendingBets = reject(all, (bet) => {
        const betAccepted = accepted.some((b) => b.id === bet.id)
        const betCancelled = cancelled.some((b) => b.id === bet.id)
        const betClosed = closed.some((b) => b.id === bet.id)
        return(betAccepted || betCancelled || betClosed)
    })

    return pendingBets
}

// // bets: pending - maker = account (proposed by account)

// export const createdBetsMakerAccountSelector = createSelector(
//     pendingBets, account,
//     (pendingBets, account) => {
//         pendingBets = pendingBets.filter((b) => b.maker === account)
//         return(pendingBets)
//     }
// )

// // bets: pending - taker = 0x0

// export const createdBetsTaker0x0Selector = createSelector(
//     pendingBets,
//     (pendingBets) => {
//         pendingBets = pendingBets.filter((b) => b.taker === '0x0000000000000000000000000000000000000000')
//         return(pendingBets)
//     }
// )

// // bets: pending - taker = account (proposed to account)

// export const createdBetsTakerAccountSelector = createSelector(
//     pendingBets, account,
//     (pendingBets, account) => {
//         pendingBets = pendingBets.filter((b) => b.taker === account)
//         return(pendingBets)
//     }
// )

// bets: pending - related to acccount

export const createdBetsForAccountSelector = createSelector(
    pendingBets, account,
    (pendingBets, account) => {
    pendingBets = pendingBets.filter((b) => b.maker === account || b.taker === account || b.taker === '0x0000000000000000000000000000000000000000') // TODO: check this
    pendingBets = decorateCreatedBetsForAccount(pendingBets, account)
    console.log("pendingBets", pendingBets)
    return(pendingBets)
    }
)

const decorateCreatedBetsForAccount = (pendingBets, account) => {
    return(
        pendingBets.map((bet) => {
            bet = addButtonText(bet, account)
        return bet
      })
    )
}

const addButtonText = (bet, account) => {
    let buttonText
  
    if (bet.maker === account) {
      buttonText = "Cancel"
    } else {
      buttonText = "Accept"
    }

    console.log('buttonText', buttonText)
  
    return({
      ...bet,
      buttonText
    })
}

// bets: open - all

const openBets = state => {
    const accepted = acceptedBets(state)
    const cancelled = cancelledBets(state)
    const closed = closedBets(state)

    const openBets = reject(accepted, (bet) => {
        const betCancelled = cancelled.some((b) => b.id === bet.id)
        const betClosed = closed.some((b) => b.id === bet.id)
        return(betCancelled || betClosed)
    })

    return openBets
}

// bets: open - maker or taker = account

export const openBetsForAccountSelector = createSelector(
    openBets, account, winnerSubmitted,
    (openBets, account, winnerSubmitted) => {
        openBets = openBets.filter((b) => b.maker === account || b.taker === account)
        openBets = decorateOpenBetsForAccount(openBets, account, winnerSubmitted)
        return(openBets)
    }
)

const decorateOpenBetsForAccount = (openBets, account, winnerSubmitted) => {
    return(
        openBets.map((bet) => {
            bet = addSubmittedWinner(bet, account, winnerSubmitted)
            bet = addUpdatedMakerTakerWinners(bet, winnerSubmitted)
        return bet
      })
    )
}

const addSubmittedWinner = (bet, account, winnerSubmitted) => {
    let submittedWinner = false
    winnerSubmitted = winnerSubmitted.filter((w) => w.id === bet.id)

    for (let i = 0; i < winnerSubmitted.length; i++) {
        if ((winnerSubmitted[i].maker === account && winnerSubmitted[i].winnerMaker != ADDRESS_0x0) || (winnerSubmitted[i].taker === account && winnerSubmitted[i].winnerTaker != ADDRESS_0x0)) {
            submittedWinner = true
        }
    }

    console.log('submittedWinner', submittedWinner)
  
    return({
      ...bet,
      submittedWinner
    })
}

const addUpdatedMakerTakerWinners = (bet, winnerSubmitted) => {
    let updatedWinnerMaker
    let updatedWinnerTaker

    winnerSubmitted = winnerSubmitted.filter((w) => w.id === bet.id)

    for (let i = 0; i < winnerSubmitted.length; i++) {
        if (winnerSubmitted[i].winnerMaker != ADDRESS_0x0) {
            updatedWinnerMaker = winnerSubmitted[i].winnerMaker
        }
        if (winnerSubmitted[i].winnerTaker != ADDRESS_0x0) {
            updatedWinnerTaker = winnerSubmitted[i].winnerTaker
        }
    }

    console.log('updatedWinnerMaker', updatedWinnerMaker)
    console.log('updatedWinnerTaker', updatedWinnerTaker)
  
    return({
      ...bet,
      updatedWinnerMaker,
      updatedWinnerTaker
    })
}

// bets: closed - maker or taker = account

export const closedBetsForAccountSelector = createSelector(
    closedBets, account,
    (closedBets, account) => {
        closedBets = closedBets.filter((b) => b.maker === account || b.taker === account)
        return(closedBets)
    }
)

// balances

export const balancesLoadedSelector = createSelector(
    tokenBalanceLoadedSelector,
    exchangeTokenBalanceSelector,
    (tb, eb) => (eb && eb) 
)

const tokenDepositAmount = state => get(state, 'exchange.tokenDepositAmount', null)
export const tokenDepositAmountSelector = createSelector(tokenDepositAmount, amount => amount)

const tokenWithdrawAmount = state => get(state, 'exchange.tokenWithdrawAmount', null)
export const tokenWithdrawAmountSelector = createSelector(tokenWithdrawAmount, amount => amount)

const newBet = state => get(state, 'exchange.newBet', {})
export const newBetSelector = createSelector(newBet, nb => nb)
