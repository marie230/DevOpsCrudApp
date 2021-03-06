pipeline {
    agent any
    environment {
        FULL_PATH_BRANCH = "${sh(script:'git name-rev --name-only HEAD', returnStdout: true)}"
        GIT_BRANCH = FULL_PATH_BRANCH.substring(FULL_PATH_BRANCH.lastIndexOf('/') + 1, FULL_PATH_BRANCH.length()).trim()
    }
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
        stage ('Deploy') {
            steps {
                dir('infrastructure') {
                    ansiblePlaybook(
                        playbook: 'ansible/deploy-' + GIT_BRANCH + '-branch.yml',
                        inventory: 'ansible/inventory',
                        disableHostKeyChecking: true
                    )
                }
            }
        }
    }
}
