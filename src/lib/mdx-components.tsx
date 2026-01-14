import { GitHubRepo } from 'app/components/github-repo'
import { DocRef, DocRefList } from 'app/components/doc-ref'
import { PostLink } from 'app/components/post-link'
import { ZoomableImage } from 'app/components/zoomable-image'
import { Pre } from 'app/components/code-block'

// MDX 全局组件，在 MDX 文件中可直接使用，无需导入
export const mdxComponents = {
  GitHubRepo,
  DocRef,
  DocRefList,
  PostLink,
  // 覆盖默认的 img 标签，使所有图片支持点击放大预览
  img: ZoomableImage,
  // 覆盖默认的 pre 标签，添加代码复制功能
  pre: Pre,
}
