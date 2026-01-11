import { GitHubRepo } from 'app/components/github-repo'
import { DocRef, DocRefList } from 'app/components/doc-ref'

// MDX 全局组件，在 MDX 文件中可直接使用，无需导入
export const mdxComponents = {
  GitHubRepo,
  DocRef,
  DocRefList,
}
