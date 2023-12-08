require 'jekyll'

module Jekyll

  class PostPathGenerator < Generator
    def generate(site)
      site.posts.docs.each do |post|
        post.data['path'] = post.url
      end
    end
  end

end
