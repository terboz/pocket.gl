define({
	meshes: [
		{ type: "teapot", name: "Teapot", y: 0},
		{ type: "sphere",  name: "Sphere",  y: 0}
	],

	uniforms: {
		bFlat:   { type: "boolean", value: true, displayName: "Flat enabled" },
	},

	//editorTheme: "bright",
	editorTheme: "dark",

	doubleSided: true,

	vertexShader: [
		"varying vec3 normalInterp;",
		"varying vec3 vertPos;",
		"",
		"void main(){",
		"    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"    vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);",
		"",
		"    normalInterp = normalMatrix * normal;",
		"    vertPos = vec3(vertPos4) / vertPos4.w;",
		"}"
	].join("\n"),

	fragmentShader: [
        "precision mediump float;",
        "",
		"varying vec3 vertPos;",
		"varying vec3 normalInterp;",
		"",
		"uniform float bFlat;",
		"",
		"const vec3 lightPos 	= vec3(200,60,100);",
		"const vec3 ambientColor = vec3(0.2, 0.0, 0.0);",
		"const vec3 diffuseColor = vec3(0.5, 0.0, 0.0);",
		"const vec3 specColor 	= vec3(1.0, 1.0, 1.0);",
		"",
		"void main() {",
		"	vec3 normal = mix(normalize(normalInterp), normalize(cross(dFdx(vertPos), dFdy(vertPos))), bFlat);",
		"	vec3 lightDir = normalize(lightPos - vertPos);",
		"",
		"	float lambertian = max(dot(lightDir,normal), 0.0);",
		"	float specular = 0.0;",
		"",
		"	if(lambertian > 0.0) {",
		"		vec3 viewDir = normalize(-vertPos);",
		"		vec3 halfDir = normalize(lightDir + viewDir);",
		"		float specAngle = max(dot(halfDir, normal), 0.0);",
		"		specular = pow(specAngle, 16.0);",
		"	}",
		"",
		"	gl_FragColor = vec4(ambientColor + lambertian * diffuseColor + specular * specColor, 1.0);",
		"}"
	].join("\n"),
});