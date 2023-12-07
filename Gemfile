source "https://rubygems.org"

# Site is not built in safe mode and allows all plugins to be loaded,
# it needs to be published to GitHub Pages using GitHub Actions.
gem "jekyll", "~> 3.9.3"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.15.1"
  gem "jekyll-seo-tag", "~> 2.8.0"
  gem "jekyll-timeago", "~> 0.15.0"
  gem "kramdown-parser-gfm", "~> 1.1.0"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Fix for Jekyll serve fails on Ruby 3.0
# See https://github.com/jekyll/jekyll/issues/8523
gem "webrick", "~> 1.8"
