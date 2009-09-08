desc "Build bjorn.js"
task :build do
  require 'rubygems'
  require 'sprockets'
  
  secretary = Sprockets::Secretary.new(
    :asset_root   => "public",
    :load_path    => ["src", "vendor/*/src"],
    :source_files => ["src/bjorn.js"]
  )
  
  FileUtils.mkdir_p("dist/")
  secretary.concatenation.save_to("dist/bjorn.js")
end