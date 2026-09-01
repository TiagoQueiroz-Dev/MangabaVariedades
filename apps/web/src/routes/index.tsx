import { createFileRoute, Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Boxes, ClipboardList, Database, Workflow } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mangaba Variedades
          </h1>
          <p className="text-xl text-gray-600">
            Aplicacao fullstack com TanStack, NestJS, Prisma e tipos compartilhados
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <FeatureCard
            title="Web"
            description="Frontend React com TanStack Router e Vite."
            icon={<Workflow size={32} />}
          />
          <FeatureCard
            title="API"
            description="Backend NestJS com Swagger e validacao por Zod."
            icon={<Database size={32} />}
          />
          <FeatureCard
            title="Tipos"
            description="Schemas compartilhados entre API e frontend."
            icon={<Boxes size={32} />}
          />
          <FeatureCard
            title="Fluxo inicial"
            description="Modulo de tarefas mantido como exemplo funcional do template."
            icon={<ClipboardList size={32} />}
          />
        </div>

        <div className="text-center">
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Abrir tarefas
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Frontend: localhost:3000 | API: localhost:3001</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="text-blue-600 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
