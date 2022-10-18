pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    stages {
        stage('Install') {
            steps {
                git branch: 'main', url: 'https://github.com/Pimpollo30/procake.git'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test --watch=false'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run ng build --base-href="./"'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'npm run firebase deploy'
            }
        }
    }

}