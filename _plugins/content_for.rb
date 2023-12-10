module Jekyll
  class ContentFor < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @key = markup.strip
    end

    def render(context)
      context.environments.first["content_for"] ||= {}
      context.environments.first["content_for"][@key] = super
      ""
    end
  end
end

Liquid::Template.register_tag('content_for', Jekyll::ContentFor)
