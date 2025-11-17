pipeline {
  agent any

tools {
    nodejs "Nodejs"
}

 environment {
    DOCKER_REGISTRY = "docker.io"
    DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIALS')
    VERSION = "${env.BUILD_ID}"
  }

  stages {

 stage('Install Dependencies') {
      steps {

        sh 'npm ci'
      }
    }

    stage('Build Project') {
      steps {
        // Build the Angular project
        sh 'npm run build'
      }
    }


    stage('Docker Build and Push') {
      steps {
          sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          sh 'docker build -t lavanyasimham/food-deliver-app-fe:${VERSION} .'
          sh 'docker push lavanyasimham/food-deliver-app-fe:${VERSION}'
      }
    }


     stage('Cleanup Workspace') {
      steps {
        deleteDir()
      }
    }

     stage('Update Image Tag in GitOps') {
      steps {
         checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[ credentialsId: 'GITHUB_PAT', url: 'https://github.com/SmartEats-cloudNative/deployment-folder.git']])
        script {
       sh '''
          sed -i "s/image:.*/image: lavanyasimham\\/food-deliver-app-fe:${VERSION}/" aws/angular-manifest.yml
        '''
          sh 'git checkout main'
          sh 'git add .'
          sh 'git commit -m "Update image tag"'
        withCredentials([usernamePassword(credentialsId: 'GITHUB_PAT',
                       usernameVariable: 'GIT_USER',
                       passwordVariable: 'GIT_TOKEN')]) {
        sh '''
          # ensure remote uses HTTPS with PAT for auth
          git remote set-url origin https://${GIT_USER}:${GIT_TOKEN}@github.com/SmartEats-cloudNative/deployment-folder.git
          git push origin main
        '''
      }
        }
      }
    }

  }


}