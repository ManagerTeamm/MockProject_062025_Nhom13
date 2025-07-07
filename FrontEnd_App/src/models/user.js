const User = (user = {}) => ({
    userName: user.userName || '',
    fullName: user.fullName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    password: user.passwordHash || '',
    avatarUrl: user.avatarUrl || "https://example.com/default-avatar.png",
    roleId: user.roleId || ''
});

export default User;
