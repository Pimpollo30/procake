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
                bat 'npm run ng test'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run ng build --base-href="./"'
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'firebase deploy --token 1//0fyYwBCY_DocLCgYIARAAGA8SNwF-L9Ir3kgjBKW0qCw9MtsSzzlD6w9EoXF2DXinkCf5gFUsbTd77zZKWy1TlFkFh6W6NHwZYLU'
            }
        }
    }

}