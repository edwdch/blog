import { LinuxPosts } from 'app/components/linux-posts'

export const metadata = {
  title: 'Linux',
  description: 'Read my Linux articles.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Linux</h1>
      <LinuxPosts />
    </section>
  )
}
