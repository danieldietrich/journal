module Jekyll

  # makes the post path `_post/<permalink>.md` available
  # in post.path and page.path
  class PostPathGenerator < Generator
    def generate(site)
      site.posts.docs.each do |post|
        post.data['path'] = post.url
      end
    end
  end

end
