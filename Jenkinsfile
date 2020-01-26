pipeline {
    agent any
    stages {
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
                    sh 'npm test'
                }
            }
        }
        stage ('Build') {
            steps {
                dir('app') {
                    sh 'npm run build'
                }
            }
        }
        stage ('Make Zip') {
            steps {
                dir('app') {
                sh 'zip -r crud-app.zip dist/'
                sh 'zip -r server.zip server/'
                }
            }
        }
        stage ('Deploy to Development Environment') {
            when{
                branch 'development'
            }
            steps {
                dir('infrastructure') {
                    ansiblePlaybook(
                        playbook: 'ansible/deploy-to-development-environment.yml',
                        inventory: 'ansible/inventory',
                        disableHostKeyChecking: true
                    )
                }
            }
        }
        stage ('Deploy to Production Environment') {
            when{
                branch 'master'
            }
            steps {
                dir('infrastructure') {
                    ansiblePlaybook(
                        playbook: 'ansible/deploy-to-production-environment.yml',
                        inventory: 'ansible/inventory',
                        disableHostKeyChecking: true
                    )
                }
            }
        }
    }
}
