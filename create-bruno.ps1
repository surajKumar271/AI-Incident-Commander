$root = "bruno\AI Incident Commander API"

# Create folders
$folders = @(
    "$root\Auth",
    "$root\Projects",
    "$root\Services",
    "$root\Incidents",
    "$root\Logs",
    "$root\Events"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

# bruno.json
@'
{
  "version": "1",
  "name": "AI Incident Commander API",
  "type": "collection"
}
'@ | Set-Content "$root\bruno.json"

# Environment
New-Item -ItemType Directory -Force -Path "$root\environments" | Out-Null

@'
{
  "baseUrl": "http://localhost:5000",
  "token": ""
}
'@ | Set-Content "$root\environments\local.bru"

# ---------------- AUTH ----------------

@'
meta {
  name: Register
  type: http
  seq: 1
}

post {
  url: {{baseUrl}}/api/auth/register
  body: json
}

headers {
  Content-Type: application/json
}

body:json {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
'@ | Set-Content "$root\Auth\Register.bru"

@'
meta {
  name: Login
  type: http
  seq: 2
}

post {
  url: {{baseUrl}}/api/auth/login
  body: json
}

headers {
  Content-Type: application/json
}

body:json {
  "email": "test@example.com",
  "password": "password123"
}
'@ | Set-Content "$root\Auth\Login.bru"

@'
meta {
  name: Me
  type: http
  seq: 3
}

get {
  url: {{baseUrl}}/api/auth/me
}

headers {
  Authorization: Bearer {{token}}
}
'@ | Set-Content "$root\Auth\Me.bru"

# ---------------- PROJECTS ----------------

@'
meta {
  name: Create Project
  type: http
  seq: 1
}

post {
  url: {{baseUrl}}/api/projects
  body: json
}

headers {
  Authorization: Bearer {{token}}
  Content-Type: application/json
}

body:json {
  "name": "AI Incident Commander",
  "description": "AI-powered production incident investigation and recovery system"
}
'@ | Set-Content "$root\Projects\Create Project.bru"

@'
meta {
  name: Get All Projects
  type: http
  seq: 2
}

get {
  url: {{baseUrl}}/api/projects
}

headers {
  Authorization: Bearer {{token}}
}
'@ | Set-Content "$root\Projects\Get All Projects.bru"

@'
meta {
  name: Get Project
  type: http
  seq: 3
}

get {
  url: {{baseUrl}}/api/projects/4
}

headers {
  Authorization: Bearer {{token}}
}
'@ | Set-Content "$root\Projects\Get Project.bru"

@'
meta {
  name: Update Project
  type: http
  seq: 4
}

patch {
  url: {{baseUrl}}/api/projects/4
  body: json
}

headers {
  Authorization: Bearer {{token}}
  Content-Type: application/json
}

body:json {
  "description": "Updated project description"
}
'@ | Set-Content "$root\Projects\Update Project.bru"

@'
meta {
  name: Delete Project
  type: http
  seq: 5
}

delete {
  url: {{baseUrl}}/api/projects/4
}

headers {
  Authorization: Bearer {{token}}
}
'@ | Set-Content "$root\Projects\Delete Project.bru"

# ---------------- SERVICES ----------------

@'
meta {
  name: Create Service
  type: http
  seq: 1
}

post {
  url: {{baseUrl}}/api/services
  body: json
}

headers {
  Authorization: Bearer {{token}}
  Content-Type: application/json
}

body:json {
  "projectId": 4,
  "name": "Incident API",
  "status": "HEALTHY"
}
'@ | Set-Content "$root\Services\Create Service.bru"

@'
meta {
  name: Get All Services
  type: http
  seq: 2
}

get {
  url: {{baseUrl}}/api/services
}

headers {
  Authorization: Bearer {{token}}
}
'@ | Set-Content "$root\Services\Get All Services.bru"

@'
meta {
  name: Get Service
  type: http
  seq: 3
}

get {
  url: {{baseUrl}}/api/services/1
}

headers {
  Authorization: Bearer {{token}}
}
'@ | Set-Content "$root\Services\Get Service.bru"

@'
meta {
  name: Update Service
  type: http
  seq: 4
}

patch {
  url: {{baseUrl}}/api/services/1
  body: json
}

headers {
  Authorization: Bearer {{token}}
  Content-Type: application/json
}

body:json {
  "status": "DEGRADED"
}
'@ | Set-Content "$root\Services\Update Service.bru"

@'
meta {
  name: Delete Service
  type: http
  seq: 5
}

delete {
  url: {{baseUrl}}/api/services/1
}

headers {
  Authorization: Bearer {{token}}
}
'@ | Set-Content "$root\Services\Delete Service.bru"

Write-Host ""
Write-Host "============================================="
Write-Host " Bruno collection created successfully!"
Write-Host "============================================="
Write-Host ""
Write-Host "Location:"
Write-Host "$root"
Write-Host ""
Write-Host "Folders created:"
Write-Host "  Auth"
Write-Host "  Projects"
Write-Host "  Services"
Write-Host "  Incidents"
Write-Host "  Logs"
Write-Host "  Events"
Write-Host ""
Write-Host "Completed requests:"
Write-Host "  Auth      : 3"
Write-Host "  Projects  : 5"
Write-Host "  Services  : 5"
Write-Host ""