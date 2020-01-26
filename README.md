# DevOpsCrudApp

This is a MEAN-Stack application created for the semester task of the module DevOps in the Master Program "Computer Science for Digital Media" at Beuth University of Applied Sciences Berlin.  
Visit the [Wiki](https://github.com/marie230/DevOpsCrudApp/wiki) for more information about the project, including the [Concept](https://github.com/marie230/DevOpsCrudApp/wiki/Konzept) of the project! (in German)

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
│   ├── tsconfig.json          # specifies root files & compiler options required to compile the project
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

A step by step guideline how to get the application running on the development and production environment in different virtual machines (VM's) provisioned with `Vagrant`.


#### Step 1
At first you need to clone the repository.
```sh
git clone git@github.com:marie230/DevOpsCrudApp.git
```
#### Step 2
Next, change to the `/infrastructure` directory in the cloned app.
```sh
cd infrastructure
```

#### Step 3
Now, you can create and configure guest machines according to the `Vagrantfile`. The `Vagrantfile` is using `Shell` & `Ansible` as provisioner to install the required software and packages on the machines.
```sh
vagrant up
```

You can login to all of the created VM's with the user ``vagrant`` and the password ``vagrant``.

#### Step 4
Now, you can commit and push changes via git on the `development` or `master` branch. In this example, the development branch is used. If you want to push changes to the `master` branch, you can specify it instead of the `development` branch in the following code guideline.  
If you push something to the ``development`` branch, it will deploy to the ``Development Environment``.  
If you push something to the ``master`` branch, it will deploy to the ``Production Environment``.

```sh
# checkout development branch 
git checkout development

# pull changes from the remote branch
git pull

# after you have made changes to the code you can add everything you changed in the code base
git add .

# commit your changes with a message
git commit -m "example commit message"

# push your changes to the specified branch
git push
```

#### Step 5
Go to http://localhost:8080 on the created VM ``jenkins-monitoring-vm``.
There, you can login with the username `admin` and password `admin`.

If you've pushed something to the ``development`` branch, open:
- http://localhost:8080/job/Development/  
On this link you can see the deployment pipeline for the ``development environment`` running.

If you've pushed something to the ``master`` branch, open:
- http://localhost:8080/job/Production/  
On this link you can see the deployment pipeline for the ``production environment`` running.

#### Step 6
If the Jenkins Pipeline has finished running and the deployment was completed successfully, you can go to
- http://hero-app-development.de/ on the created VM ``development-environment`` if you have deployed to this environment
- http://hero-app-production.de/ on the created VM ``production-environment`` if you have deployed to this environment

#### Step 7
To see the monitoring metrics recorded with ``Prometheus``, you can go to http://localhost:3000/dashboards on 
the created VM ``jenkins-monitoring-vm`` and click on the ``Grafana`` Dashboard ``Node Exporter Full``.
The ``Node Exporter Full`` dashboard contains relevant information on all created VM's. You can change
a VM if you select it in the "Job" Dropdown-Select.  
You can login to Grafana with the user ``admin`` and password ``admin``.

### Notes
Ansible Roles used for provisioning that were not written by myself:
- [Jenkins](https://github.com/geerlingguy/ansible-role-jenkins)
  - This role was extended to create 2 Jenkins pipelines for the development and production environment.
- [Java](https://github.com/geerlingguy/ansible-role-java)
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

### Development server 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

#### Start frontend and backend simultaneously

- Run `npm start` for a dev server.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. This can take more time than starting frontend and backend separately in different terminals. 

#### Start frontend only

- Run `npm client` or `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Start backend only

- Run `npm run server` for a dev server.
- You can test the server at `http://localhost:1234/api/heroes`. The app will automatically reload if you change any of the source files.

##### Backend REST API endpoints

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

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running linter

Run `ng lint` to execute the TypeScript linter via [TSLint](https://palantir.github.io/tslint/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
