# DevOpsCrudApp

This is a MEAN-Stack application created for the semester task of the module DevOps in the Master Program "Computer Science for Digital Media" at Beuth University of Applied Sciences Berlin.  
Visit the [Wiki](https://github.com/marie230/DevOpsCrudApp/wiki) for more information about the project, including the [Concept](https://github.com/marie230/DevOpsCrudApp/wiki/Konzept) of the project! (in German)

## Setup for deployment with Vagrant VM's 

### Requirements

All of the listed requirements in this section have to be installed depending on your operating system:

All operating systems:
- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/) with npm
- [Vagrant](https://www.vagrantup.com/downloads.html)
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

If your host operating system **is any other than** Windows: 
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

If your host operating system **is** Windows: 
- [vagrant-guest_ansible](https://github.com/vovimayhem/vagrant-guest_ansible)

### Installation

- clone repository
```sh
git clone git@github.com:marie230/DevOpsCrudApp.git
```
- change to the `/infrastructure` directory
```sh
cd infrastructure
```
- create and configure guest machines according to the Vagrantfile
```sh
vagrant up
```

---

## Setup to run the app locally

### Requirements

- [NodeJS](https://nodejs.org/en/download/) with npm
- [mongoDB](https://www.mongodb.com/download-center/community)

### Installation
  
- clone repository
```sh
git clone git@github.com:marie230/DevOpsCrudApp.git
```
- change to the `/app` directory
```sh
cd app
```
- install dependencies
```sh
npm install
```

## Development server 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

### Start frontend and backend simultaneously

- Run `npm start` for a dev server.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. This can take more time than starting frontend and backend separately in different terminals. 

### Start frontend only

- Run `npm client` or `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Start backend only

- Run `npm run server` for a dev server.
- You can test the server at `http://localhost:1234/api/heroes`. The app will automatically reload if you change any of the source files.

#### Backend REST API endpoints

- GET `http://localhost:1234/api/heroes` --> get all heroes from the database
- GET `http://localhost:1234/api/heroes/1` --> get single hero with given id (e.g. 1)
- POST `http://localhost:1234/api/heroes/` --> post single hero using the following JSON as body

```sh
{
"name": "Example Hero",
"imageUrl": "https://example-url.jpg",
"superPower": "example superpower",
"description": "example description"
}
```
- PUT `http://localhost:1234/api/heroes/1` --> update single hero with given id (e.g. 1) using the following JSON as body

```sh
{
"name": "Example Hero",
"imageUrl": "https://example-url.jpg",
"superPower": "example superpower",
"description": "example description"
}
```

- DELETE `http://localhost:1234/api/heroes/1` --> delete single hero with given id (e.g. 1)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running linter

Run `ng lint` to execute the TypeScript linter via [TSLint](https://palantir.github.io/tslint/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Project structure

```bash
.                                              
├── app                       # source files 
│   ├── dist                   # bundled frontend files to deploy            
│   ├── server                 # backend server configuration 
│   |    ├── db                  # database models
│   |    ├── routes              # backend routing logic
│   |    └── package.json        # contains all backend depencencies
│   ├── src                    # frontend app files 
│   |    ├── app                 # frontend app with all components
│   |    ├── main.ts             # bootstrapping configuration
│   |    └── test.ts             # test configuration
│   ├── karma.conf.js          # test framework configuration
│   ├── tsconfig.json          # specifies the root files and the compiler options required to compile the project
│   ├── yarn.lock              # stores exactly which versions of each dependencies were installed
│   └── package.json           # contains all frontend depencencies
├── infrastructure           # infrasturcture files for configuration
│   ├── ansible                # playbooks and configuration files to configure vm's
│   |    ├── monitoring          # configuration files for monitoring
│   |    ├── roles               # roles used in the ansible playbooks
│   |    └── tasks               # tasks used in the ansible playbooks
│   └── Vagrantfile            # provisioning of VMs
├── Jenkinsfile              # Jenkins pipeline configuration   
└── README.md 
```
