# frozen_string_literal: true

require "fileutils"

# Publish the generated sitemap at /minmul_sitemap.xml for Search Console.
Jekyll::Hooks.register :site, :post_write do |site|
  src = File.join(site.dest, "sitemap.xml")
  dest = File.join(site.dest, "minmul_sitemap.xml")
  FileUtils.cp(src, dest) if File.file?(src)
end
