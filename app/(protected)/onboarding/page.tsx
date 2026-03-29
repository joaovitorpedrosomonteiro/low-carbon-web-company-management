"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, title: "Perfil da Empresa", description: "Confirme os dados da empresa" },
  { id: 2, title: "Primeira Filial", description: "Crie ao menos uma filial" },
  { id: 3, title: "Primeiro Funcionário", description: "Adicione um funcionário" },
  { id: 4, title: "Modelo de Emissão", description: "Selecione o modelo padrão" },
  { id: 5, title: "Concluído", description: "Configuração finalizada" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");

  function nextStep() {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function finish() {
    router.push("/");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuração Inicial</h1>
        <p className="text-muted-foreground">
          Siga os passos abaixo para configurar sua empresa
        </p>
      </div>

      <div className="flex items-center gap-2">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep > step.id
                  ? "bg-green-600 text-white"
                  : currentStep === step.id
                  ? "bg-green-100 text-green-700 border-2 border-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-12 ${
                  currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Passo {currentStep}: {STEPS[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Confirme ou edite as informações da sua empresa.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome da Empresa</label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CNPJ</label>
                <Input placeholder="00.000.000/0000-00" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço</label>
                <Input placeholder="Endereço completo" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Crie a primeira filial da sua empresa.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome da Filial</label>
                <Input
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="Ex: Filial São Paulo"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Adicione o primeiro funcionário (opcional).
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email do Funcionário</label>
                <Input
                  type="email"
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  placeholder="funcionario@email.com"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selecione o modelo de emissão padrão para seus inventários.
              </p>
              <div className="border rounded-md p-4 bg-green-50 border-green-200">
                <p className="font-medium">Modelo Industrial Padrão</p>
                <p className="text-sm text-muted-foreground">
                  Escopo 1, 2 e 3 — 15 emissões
                </p>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4 text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Configuração Concluída!</h2>
              <p className="text-muted-foreground">
                Sua empresa está pronta para começar a usar o Low Carbon.
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Voltar
            </Button>
            {currentStep < 5 ? (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => router.push("/")}>
                  Pular
                </Button>
                <Button onClick={nextStep}>Próximo</Button>
              </div>
            ) : (
              <Button onClick={finish}>Ir para o Dashboard</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
