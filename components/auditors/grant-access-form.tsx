"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GrantAccessFormProps {
  onSubmit: (data: {
    scope: string;
    resourceId?: string;
  }) => void;
}

export function GrantAccessForm({ onSubmit }: GrantAccessFormProps) {
  const [scope, setScope] = useState("");
  const [resourceId, setResourceId] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (scope) {
      onSubmit({ scope, resourceId: resourceId || undefined });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Escopo de Acesso</label>
        <Select value={scope} onValueChange={setScope}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o escopo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single_inventory">Inventário Único</SelectItem>
            <SelectItem value="company_branch">Filial Inteira</SelectItem>
            <SelectItem value="company">Empresa Inteira</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {scope === "single_inventory" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">ID do Inventário</label>
          <Input
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            placeholder="UUID do inventário"
          />
        </div>
      )}

      {scope === "company_branch" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">ID da Filial</label>
          <Input
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            placeholder="UUID da filial"
          />
        </div>
      )}

      <Button type="submit" className="w-full">
        Conceder Acesso
      </Button>
    </form>
  );
}
