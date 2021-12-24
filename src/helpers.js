export const DECIMALS = (10**18)

// shortcut to avoid passing around web3 connection
export const ether = (wei) => {
    if(wei) {
        return(wei / DECIMALS) // 18 decimal places
    }
}