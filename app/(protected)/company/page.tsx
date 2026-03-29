"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store/auth";

export default function CompanyPage() {
  const user = useAuthStore((s) => s.user);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Empresa Exemplo Ltda");
  const [cnpj, setCnpj] = useState("12.345.678/0001-90");
  const [street, setStreet] = useState("Av. Paulista, 1000");
  const [city, setCity] = useState("São Paulo");
  const [state, setState] = useState("SP");
  const [postalCode, setPostalCode] = useState("01310-100");

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Empresa</h1>
          <p className="text-muted-foreground">
            Informações da sua empresa
          </p>
        </div>
        <Button
          variant={editing ? "outline" : "default"}
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancelar" : "Editar"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">CNPJ</label>
            <Input
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              disabled={!editing}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rua</label>
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!editing}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <Input
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CEP</label>
              <Input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                disabled={!editing}
              />
            </div>
          </div>
          {editing && (
            <Button className="w-full">Salvar Alterações</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
