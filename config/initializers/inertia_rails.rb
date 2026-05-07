# frozen_string_literal: true

InertiaRails.configure do |config|
  config.use_script_element_for_initial_page = true
  config.use_data_inertia_head_attribute = true
  config.always_include_errors_hash = true
  config.use_script_element_for_initial_page = true
  config.ssr_enabled = ViteRuby.config.ssr_build_enabled
  config.version = ViteRuby.digest
end
