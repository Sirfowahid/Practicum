// usersData.ts

export interface User {
    id: number;
    username: string;
    email: string;
    role: 'Admin' | 'User';
  }
  
  export const usersData: User[] = [
    { id: 1, username: 'john_doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, username: 'jane_smith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, username: 'michael_johnson', email: 'michael.johnson@example.com', role: 'User' },
    { id: 4, username: 'emily_davis', email: 'emily.davis@example.com', role: 'User' },
    { id: 5, username: 'david_clark', email: 'david.clark@example.com', role: 'Admin' },
    { id: 6, username: 'susan_baker', email: 'susan.baker@example.com', role: 'User' },
    { id: 7, username: 'robert_jones', email: 'robert.jones@example.com', role: 'Admin' },
    { id: 8, username: 'linda_anderson', email: 'linda.anderson@example.com', role: 'User' },
    { id: 9, username: 'william_taylor', email: 'william.taylor@example.com', role: 'User' },
    { id: 10, username: 'sarah_wilson', email: 'sarah.wilson@example.com', role: 'Admin' },
    { id: 11, username: 'kevin_miller', email: 'kevin.miller@example.com', role: 'User' },
    { id: 12, username: 'amanda_thomas', email: 'amanda.thomas@example.com', role: 'Admin' },
    { id: 13, username: 'peter_young', email: 'peter.young@example.com', role: 'User' },
    { id: 14, username: 'laura_moore', email: 'laura.moore@example.com', role: 'User' },
    { id: 15, username: 'chris_wilson', email: 'chris.wilson@example.com', role: 'User' },
  ];
  