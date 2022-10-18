pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    stages {
        stage('Install') {
            steps {
                git branch: 'main', url: 'https://github.com/Pimpollo30/procake.git'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test:ci'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build --base-href="./"'
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'npm run firebase deploy'
            }
        }
    }

}