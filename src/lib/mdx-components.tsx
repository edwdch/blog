import { GitHubRepo } from 'app/components/github-repo'
import { DocRef, DocRefList } from 'app/components/doc-ref'
import { PostLink } from 'app/components/post-link'
import { ZoomableImage } from 'app/components/zoomable-image'
import { Variables, Var } from 'app/components/variables'

// MDX 全局组件，在 MDX 文件中可直接使用，无需导入
export const mdxComponents = {
  GitHubRepo,
  DocRef,
  DocRefList,
  PostLink,
  Variables,
  Var,
  // 覆盖默认的 img 标签，使所有图片支持点击放大预览
  img: ZoomableImage,
}
