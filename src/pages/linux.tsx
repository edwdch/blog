import { LinuxPosts } from 'app/components/linux-posts'

export default function LinuxPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Linux</h1>
      <LinuxPosts />
    </section>
  )
}
