/*
Registration process pseudo code
---------------------------------
- start
- name = input();
- email = input();
- password = input();
- if name && email && password is invalid:
- return 400 error

- user = find user with email
- if user found 
- return 400 error

- hash = hash password
- user = save name, email and hash to User model(store in db)
- return 201
- end

Login process pseudo code
-------------------------
- start
- email = input();
- password = input();

- user = find user with email
- if user not found 
- return 400 error

- if password is not equal to user.hash
- return 400 error

- token = generate token using user info
- return token
- end
*/