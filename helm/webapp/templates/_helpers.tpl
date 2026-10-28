{{/*
Helpers take a dict: (dict "root" $ "component" "backend")
*/}}

{{- define "webapp.fullname" -}}
{{- printf "%s-%s" .root.Release.Name .component | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{- define "webapp.selectorLabels" -}}
app.kubernetes.io/name: {{ .component }}
app.kubernetes.io/instance: {{ .root.Release.Name }}
{{- end }}

{{- define "webapp.labels" -}}
{{ include "webapp.selectorLabels" . }}
app.kubernetes.io/part-of: {{ .root.Chart.Name }}
app.kubernetes.io/version: {{ .root.Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .root.Release.Service }}
helm.sh/chart: {{ printf "%s-%s" .root.Chart.Name .root.Chart.Version }}
{{- end }}

{{- define "webapp.image" -}}
{{- $image := index .root.Values .component "image" -}}
{{- printf "%s:%s" $image.repository ($image.tag | default .root.Chart.AppVersion) -}}
{{- end }}

{{- define "webapp.containerSecurityContext" -}}
allowPrivilegeEscalation: false
readOnlyRootFilesystem: true
capabilities:
  drop: ["ALL"]
{{- end }}

{{- define "webapp.backendSecretName" -}}
{{- .Values.backend.secret.existingSecret | default (include "webapp.fullname" (dict "root" . "component" "backend")) -}}
{{- end }}
