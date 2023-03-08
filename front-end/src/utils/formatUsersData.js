const formatUsersRole = (users) => {
  users.forEach((user) => {
    if (user.role === 'seller') user.role = 'P.Vendedora';
    if (user.role === 'customer') user.role = 'Cliente';
  });
};

export default formatUsersRole;
