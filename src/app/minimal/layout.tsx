import MinimalLayout from '@/layouts/minimal/layout';
import { WalletProvider } from '@/components/nft/WalletContext';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <MinimalLayout>{children}</MinimalLayout>
    </WalletProvider>
  );
}
