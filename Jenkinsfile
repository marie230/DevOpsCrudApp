pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                dir('app') {
                    sh 'npm install'
                }
            }
        }
        stage('TSlint') {
            steps {
                dir('app') {
                    sh 'npm run lint'
                }
            }
        }
        stage('Test') {
            steps {
                dir('app') {
                    try {
                        sh 'npm test --watch=false --no-progress --browsers=ChromeHeadless'
                    } catch (e) {
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        stage ('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage ('Make Zip') {
            steps {
                dir('app') {
                sh 'zip crud-app.zip dist'
                }
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
