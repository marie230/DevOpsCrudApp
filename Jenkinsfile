pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
            checkout([$class: 'GitSCM',
                    branches: [[name: '*/development']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [[$class: 'RelativeTargetDirectory',
                        relativeTargetDir: 'app']],
                    submoduleCfg: [],
                    userRemoteConfigs: [[url: 'https://github.com/marie230/DevOpsCrudApp.git']]])
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('TSlint') {
            steps {
                sh 'ng lint'
            }
        }
        stage('Test') {
            steps {
                sh 'ng test --watch=false --no-progress --browsers=ChromeHeadless'
            }
        }
        stage ('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage ('Make Zip') {
            steps {
                sh 'zip crud-app.zip dist'
            }
        }
        stage ('Deploy') {
            steps {
               echo 'TODO'
            }
        }
        stage ('Done') {
            steps {
               echo 'TODO'
               print('Successfully deployed!')
            }
        }
    }
}