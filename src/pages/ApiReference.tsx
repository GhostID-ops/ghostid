import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Copy, Check } from "lucide-react";

const ApiReference = () => {
  const [copiedId, setCopiedId] = useState<string>("");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const endpoints = [
    {
      method: "POST",
      path: "/api/auth/connect",
      description: "Initialize wallet connection and authentication",
      params: [
        { name: "walletAddress", type: "string", required: true, description: "User's wallet address" },
        { name: "chainId", type: "number", required: true, description: "Blockchain network ID" },
      ],
      response: {
        sessionId: "string",
        expiresAt: "timestamp",
        success: "boolean",
      },
    },
    {
      method: "POST",
      path: "/api/proof/generate",
      description: "Generate a zero-knowledge proof for authentication",
      params: [
        { name: "sessionId", type: "string", required: true, description: "Active session identifier" },
        { name: "duration", type: "number", required: false, description: "Token validity in seconds (default: 3600)" },
      ],
      response: {
        proofToken: "string",
        tokenId: "string",
        expiresAt: "timestamp",
      },
    },
    {
      method: "GET",
      path: "/api/proof/verify",
      description: "Verify a zero-knowledge proof token",
      params: [
        { name: "token", type: "string", required: true, description: "ZK proof token to verify" },
      ],
      response: {
        valid: "boolean",
        expiresAt: "timestamp",
        metadata: "object",
      },
    },
    {
      method: "POST",
      path: "/api/session/revoke",
      description: "Revoke an active session and invalidate all associated tokens",
      params: [
        { name: "sessionId", type: "string", required: true, description: "Session to revoke" },
      ],
      response: {
        success: "boolean",
        message: "string",
      },
    },
  ];

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="relative">
      <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedId === id ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">API Reference</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Complete API documentation for integrating GhostID into your application.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Authentication */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Authentication</h2>
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <p className="text-muted-foreground mb-4">
                  All API requests require authentication using your API key in the request header:
                </p>
                <CodeBlock
                  id="auth-header"
                  code={`Authorization: Bearer YOUR_API_KEY`}
                />
              </Card>
            </section>

            {/* Base URL */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Base URL</h2>
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <CodeBlock
                  id="base-url"
                  code={`https://api.ghostid.network/v1`}
                />
              </Card>
            </section>

            {/* Endpoints */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Endpoints</h2>
              <div className="space-y-6">
                {endpoints.map((endpoint, index) => (
                  <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-start gap-3 mb-4">
                      <Badge
                        variant={endpoint.method === "GET" ? "default" : "secondary"}
                        className="font-mono"
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                    </div>
                    <p className="text-muted-foreground mb-6">{endpoint.description}</p>

                    <Tabs defaultValue="parameters" className="w-full">
                      <TabsList>
                        <TabsTrigger value="parameters">Parameters</TabsTrigger>
                        <TabsTrigger value="response">Response</TabsTrigger>
                        <TabsTrigger value="example">Example</TabsTrigger>
                      </TabsList>

                      <TabsContent value="parameters" className="mt-4">
                        <div className="space-y-3">
                          {endpoint.params.map((param, i) => (
                            <div key={i} className="border border-border rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <code className="font-mono text-sm font-semibold">{param.name}</code>
                                <Badge variant="outline" className="text-xs">
                                  {param.type}
                                </Badge>
                                {param.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    required
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{param.description}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="response" className="mt-4">
                        <CodeBlock
                          id={`response-${index}`}
                          code={JSON.stringify(endpoint.response, null, 2)}
                        />
                      </TabsContent>

                      <TabsContent value="example" className="mt-4">
                        <CodeBlock
                          id={`example-${index}`}
                          code={`fetch('https://api.ghostid.network/v1${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${JSON.stringify(
    endpoint.params.reduce((acc, param) => {
      acc[param.name] = param.type === "string" ? "your_value" : param.type === "number" ? 3600 : true;
      return acc;
    }, {} as any),
    null,
    4
  )})
})
.then(res => res.json())
.then(data => console.log(data));`}
                        />
                      </TabsContent>
                    </Tabs>
                  </Card>
                ))}
              </div>
            </section>

            {/* Rate Limits */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Free Tier</span>
                    <span className="font-mono">100 requests/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pro Tier</span>
                    <span className="font-mono">1,000 requests/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Enterprise</span>
                    <span className="font-mono">Custom limits</span>
                  </div>
                </div>
              </Card>
            </section>

            {/* SDKs */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Official SDKs</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
                  <h3 className="font-semibold mb-2">JavaScript/TypeScript</h3>
                  <code className="text-sm text-muted-foreground">npm install @ghostid/sdk</code>
                </Card>
                <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
                  <h3 className="font-semibold mb-2">Python</h3>
                  <code className="text-sm text-muted-foreground">pip install ghostid</code>
                </Card>
                <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
                  <h3 className="font-semibold mb-2">Go</h3>
                  <code className="text-sm text-muted-foreground">go get github.com/ghostid/sdk-go</code>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiReference;
