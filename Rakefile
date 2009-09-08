desc "Build bjorn.js"
task :build do
  require 'rubygems'
  require 'sprockets'
  require 'jsmin' rescue nil
  
  secretary = Sprockets::Secretary.new(
    :asset_root   => "public",
    :load_path    => ["src", "vendor/*/src"],
    :source_files => ["src/bjorn.js"]
  )
  
  js_source = secretary.concatenation.to_s
  
  # Minify the source, if installed
  if defined?(JSMin)
    js_source = JSMin.minify(js_source)
  end
  
  FileUtils.mkdir_p("dist/")
  File.open("dist/bjorn.js","w") do |f|
    f.write(js_source)
  end
end