# mockeasy

This repo is a fast alternative  when you need some fake data.  It's great for development environments, tutorials, faking a server, sharing code examples, jokes, etc


# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Prerequisites

What things you need to install the software and how to install them

```
Node JS
```

# Installing

```
npm intall
```


# Developing


```
npm run dev
```

# Add mocks

- Create a folder with api name inside **mocks** folder. This value will be used as part of url.
- If you need to mock **/acme-api/user/auth** endpoint, you must create **/user/auth** inside **acme-api** folder.
- Finally create a mock.json file with any json text.

# Sample

This file
```
mocks/acme-api/user/auth/mock.json
```

expose this endpoint:
```
curl localhost:5000/acme-api/user/auth
```
