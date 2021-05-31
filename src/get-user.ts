export type User = {
    id: string;
    name: string;
};

export const getUser = (): Promise<User> => {
    return Promise.resolve({id: '1', name: 'David'})
};
