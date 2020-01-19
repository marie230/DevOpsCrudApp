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
                }
            }
        }
        stage ('Deploy') {
            steps {
                dir('infrastructure') {
                    ansiblePlaybook(
                        playbook: 'ansible/deploy-to-development-environment.yml',
                        inventory: 'ansible/inventory',
                        credentialsId: '/.vagrant/machines/development/virtualbox/private_key',
                    )
                }
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
