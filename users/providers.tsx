import React from 'react';

export const UserContext:React.Context<any[]> 
    = React.createContext([undefined, undefined]);

export const UserProvider:React.Provider<any[]> 
    = UserContext.Provider;

