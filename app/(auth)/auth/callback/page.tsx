'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      document.cookie = `token=${token}; path=/; max-age=${86400 * 3};`;
    }

    router.replace('/dashboard');
  }, []);

  return <div>Autenticando...</div>;
}