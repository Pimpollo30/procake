pipeline {  
    agent any

    tools {
        nodejs 'node'
        maven 'maven'
        jdk 'jdk'
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
                bat '''
                C:
                cd %PRUEBA_SELENIUM%
                mvn clean test
                '''
            }
        }

        stage('Build') {
            steps {
                bat 'npm run ng build --base-href="./"'
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'firebase deploy --token %FIREBASE_TOKEN%'
            }
        }
    }

}